import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  location: string;
  summary: string;

  jobTitle: string;
  company: string;
  workDuration: string;
  workDescription: string;

  degree: string;
  school: string;
  year: string;

  skills: string[];

  resumeUri: string | null;

  goal: string;
  jobTypes: string;
  interests: string;
}

interface RegisterContextProps {
  data: RegisterData;
  update: (val: Partial<RegisterData>) => void;
  clear: () => void;
}

interface ProviderProps {
  children: ReactNode;
}

const defaultData: RegisterData = {
  fullName: "",
  email: "",
  password: "",
  phone: "",
  location: "",
  summary: "",

  jobTitle: "",
  company: "",
  workDuration: "",
  workDescription: "",

  degree: "",
  school: "",
  year: "",

  skills: [],

  resumeUri: null,

  goal: "",
  jobTypes: "",
  interests: "",
};

const RegisterContext = createContext<RegisterContextProps>(null!);

export const RegisterProvider = ({ children }: ProviderProps) => {
  const [data, setData] = useState<RegisterData>(defaultData);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const saved = await AsyncStorage.getItem("register-progress");
      if (saved && mounted) {
        setData(JSON.parse(saved));
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      AsyncStorage.setItem("register-progress", JSON.stringify(data));
    }

    return () => {
      mounted = false;
    };
  }, [data]);

  const update = (val: Partial<RegisterData>) =>
    setData((prev) => ({ ...prev, ...val }));

  const clear = () => setData(defaultData);

  return (
    <RegisterContext.Provider value={{ data, update, clear }}>
      {children}
    </RegisterContext.Provider>
  );
};

export const useRegister = () => useContext(RegisterContext);
