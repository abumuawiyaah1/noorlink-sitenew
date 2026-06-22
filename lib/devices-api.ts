export type DeviceModel = {
  id: string;
  name: string;
};

export type DeviceBrand = {
  id: string;
  name: string;
  models: DeviceModel[];
};

export type CompatibleDevicesResponse = {
  success: boolean;
  brands: DeviceBrand[];
};

const DEVICES_COMPATIBLE_URL =
  "http://127.0.0.1:8000/api/v1/devices/compatible";

export async function fetchCompatibleDevices(): Promise<DeviceBrand[]> {
  try {
    const res = await fetch(DEVICES_COMPATIBLE_URL, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      throw new Error(`Failed to load compatible devices (${res.status})`);
    }

    const data = (await res.json()) as CompatibleDevicesResponse;
    return data.brands ?? [];
  } catch (err) {
    console.error(
      "[CompatibilityModal] Device list fetch failed:",
      err,
    );
    throw err;
  }
}
