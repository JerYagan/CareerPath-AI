import { Asset } from "expo-asset";

export const loadSvgXml = async (mod: number) => {
  const asset = Asset.fromModule(mod);
  await asset.downloadAsync(); // ensures it's local
  const response = await fetch(asset.localUri!);
  return await response.text();
};
