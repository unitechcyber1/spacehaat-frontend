import { getVerticalLandingData } from "@/services/mock-db";
import { SpaceVertical } from "@/types";

export async function getVerticalLandingContent(vertical: SpaceVertical) {
  return getVerticalLandingData(vertical);
}
