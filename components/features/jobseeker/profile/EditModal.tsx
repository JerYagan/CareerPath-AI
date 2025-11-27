import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export type Field =
  | { key: string; label: string; type: "text"; value: string }
  | { key: string; label: string; type: "textarea"; value: string }
  | { key: string; label: string; type: "number"; value: number }
  | { key: string; label: string; type: "file"; value: string | null }
  | {
      key: string;
      label: string;
      type: "select";
      value: string;
      options: string[];
    };

interface UniversalModalProps {
  visible: boolean;
  title: string;
  mode: string;
  fields: Field[];
  onSave: (updates: any) => void;
  onClose: () => void;
  onUploadFile?: (key: string) => void;
  onDeleteFile?: (key: string) => void;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isValidPhonePH = (value: string): boolean => {
  const cleaned = value.replace(/\s+/g, "");
  return /^\+639\d{9}$/.test(cleaned);
};

const isValidYearRange = (value: string): boolean => {
  // "2019 - 2021" or "2019-2021" or "2019 - Present"
  const pattern = /^(\d{4})\s*-\s*(\d{4}|Present)$/i;
  return pattern.test(value.trim());
};

const isValidYear = (value: string): boolean => {
  const year = parseInt(value, 10);
  return !isNaN(year) && year >= 2000 && year <= 2050;
};

const UniversalEditModal: React.FC<UniversalModalProps> = ({
  visible,
  title,
  mode,
  fields,
  onSave,
  onClose,
  onUploadFile,
  onDeleteFile,
}) => {
  const [localValues, setLocalValues] = useState<any>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const initial: any = {};
    fields.forEach((f) => {
      initial[f.key] = f.value;
    });
    setLocalValues(initial);
    setErrors({});
  }, [fields, visible]);

  if (!visible) return null;

  const updateValue = (field: Field, raw: string) => {
    if (field.type === "number") {
      let n = parseInt(raw || "0", 10);
      if (isNaN(n)) n = 0;
      if (n < 0) n = 0;
      if (n > 100) n = 100;
      setLocalValues((prev: any) => ({ ...prev, [field.key]: n }));
    } else {
      setLocalValues((prev: any) => ({ ...prev, [field.key]: raw }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    const get = (key: string) => localValues[key];

    if (mode === "basic-info") {
      if (!get("name") || get("name").trim().length < 2)
        newErrors["name"] = "Name must be at least 2 characters.";
      if (!get("position") || get("position").trim().length < 2)
        newErrors["position"] = "Position must be at least 2 characters.";
      if (!get("location") || get("location").trim().length < 2)
        newErrors["location"] = "Location must be at least 2 characters.";

      const email = get("email") || "";
      if (!emailRegex.test(email.trim()))
        newErrors["email"] = "Enter a valid email address.";

      const phone = get("phone") || "";
      if (!isValidPhonePH(phone))
        newErrors["phone"] = "Phone must be in +639XXXXXXXXX format.";

      const bio = get("description") || "";
      if (bio.trim().length < 10)
        newErrors["description"] = "Bio must be at least 10 characters.";
    }

    if (mode === "experience" || mode === "add-experience") {
      if (!get("title") || get("title").trim().length < 2)
        newErrors["title"] = "Job title must be at least 2 characters.";
      if (!get("company") || get("company").trim().length < 2)
        newErrors["company"] = "Company must be at least 2 characters.";
      if (!get("years") || !isValidYearRange(get("years")))
        newErrors["years"] = "Format must be like 2019 - 2021 or 2019 - Present.";
      if (!get("description") || get("description").trim().length < 10)
        newErrors["description"] = "Description must be at least 10 characters.";
    }

    if (mode === "skill") {
      if (!get("name") || get("name").trim().length < 2)
        newErrors["name"] = "Skill name must be at least 2 characters.";
      const lvl = get("level");
      if (typeof lvl !== "number" || lvl < 0 || lvl > 100)
        newErrors["level"] = "Level must be between 0 and 100.";
    }

    if (mode === "roadmap") {
      if (!get("title") || get("title").trim().length < 2)
        newErrors["title"] = "Goal title must be at least 2 characters.";
      if (!get("status"))
        newErrors["status"] = "Status is required.";
      const p = get("progress");
      if (typeof p !== "number" || p < 0 || p > 100)
        newErrors["progress"] = "Progress must be between 0 and 100.";
      if (!get("deadline") || get("deadline").trim().length < 4)
        newErrors["deadline"] = "Deadline is required.";
    }

    if (mode === "certificates") {
      if (!get("name") || get("name").trim().length < 2)
        newErrors["name"] = "Certificate name must be at least 2 characters.";
      if (!get("organization") || get("organization").trim().length < 2)
        newErrors["organization"] =
          "Organization must be at least 2 characters.";
      if (!get("year") || !isValidYear(get("year")))
        newErrors["year"] = "Enter a valid year between 2000 and 2050.";
    }

    if (mode === "languages") {
      const raw = get("languages") || "";
      const langs = raw
        .split(",")
        .map((x: string) => x.trim())
        .filter((x: string) => x.length > 0);
      if (!langs.length)
        newErrors["languages"] = "Enter at least one language.";
      else if (langs.some((l: string) => l.length < 2))
        newErrors["languages"] =
          "Each language must be at least 2 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave(localValues);
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/30 justify-center items-center px-6">
        <View className="bg-white p-6 rounded-2xl w-full max-h-[85%] shadow-xl">
          <Text className="text-lg font-semibold mb-4">{title}</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            {fields.map((f) => (
              <View key={f.key} className="mb-4">
                <Text className="text-gray-700 font-medium mb-1">
                  {f.label}
                </Text>

                {f.type === "text" && (
                  <TextInput
                    className="border border-gray-300 rounded-xl p-3"
                    value={String(localValues[f.key] ?? "")}
                    onChangeText={(v) => updateValue(f, v)}
                  />
                )}

                {f.type === "textarea" && (
                  <TextInput
                    className="border border-gray-300 rounded-xl p-3 min-h-[100px]"
                    multiline
                    value={String(localValues[f.key] ?? "")}
                    onChangeText={(v) => updateValue(f, v)}
                  />
                )}

                {f.type === "number" && (
                  <TextInput
                    className="border border-gray-300 rounded-xl p-3"
                    keyboardType="numeric"
                    value={String(localValues[f.key] ?? 0)}
                    onChangeText={(v) => updateValue(f, v)}
                  />
                )}

                {f.type === "select" && f.options && (
                  <View className="flex-row flex-wrap gap-2">
                    {f.options.map((opt) => {
                      const active = localValues[f.key] === opt;
                      return (
                        <TouchableOpacity
                          key={opt}
                          onPress={() =>
                            setLocalValues((prev: any) => ({
                              ...prev,
                              [f.key]: opt,
                            }))
                          }
                          className={`px-3 py-1 rounded-full border ${
                            active
                              ? "bg-indigo-100 border-indigo-500"
                              : "bg-gray-100 border-gray-300"
                          }`}
                        >
                          <Text
                            className={
                              active
                                ? "text-indigo-700 text-xs"
                                : "text-gray-700 text-xs"
                            }
                          >
                            {opt}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                )}

                {f.type === "file" && (
                  <View className="flex-row gap-3 mt-4">
                    <TouchableOpacity
                      className="px-3 py-2 bg-indigo-600 rounded-lg"
                      onPress={() => onUploadFile && onUploadFile(f.key)}
                    >
                      <Text className="text-white">Upload</Text>
                    </TouchableOpacity>

                    {localValues[f.key] && (
                      <TouchableOpacity
                        className="px-3 py-2 bg-red-500 rounded-lg"
                        onPress={() => onDeleteFile && onDeleteFile(f.key)}
                      >
                        <Text className="text-white">Delete</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}

                {errors[f.key] && (
                  <Text className="text-red-500 text-xs mt-1">
                    {errors[f.key]}
                  </Text>
                )}
              </View>
            ))}
          </ScrollView>

          <View className="flex-row justify-end gap-6 mt-2">
            <TouchableOpacity onPress={onClose} className="p-2">
              <Text className="text-gray-500">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSave} className="p-2">
              <Text className="text-brandBlue font-bold">Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default UniversalEditModal;