import { getHomepageData } from "@/services/mock-db";

export async function getHomepageContent() {
  return getHomepageData();
}
