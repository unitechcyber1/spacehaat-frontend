/**
 * Office space root model (`OfficeSpace extends WorkSpace`) and `other_detail` types.
 * Composes {@link BuilderModel.Builder} and {@link SubBuilderModel.SubBuilder}.
 */

import type { CoworkingModel } from "@/types/coworking-workspace.model";
import type { BuilderModel } from "@/types/builder.model";
import type { SubBuilderModel } from "@/types/subbuilder.model";

export namespace OfficeSpaceModel {
  export interface FoodOption {
    is_include: boolean;
    price: number;
  }

  export interface OtherDetail {
    building_name: string;
  }

  export interface OfficeSpaceFacilityRow {
    name: string;
    value: string;
  }

  export interface OfficeSpaceOtherDetailOptions {
    zoom: number;
  }

  export interface OfficeSpaceOtherDetail {
    area_for_lease_in_sq_ft: number;
    building_name: string;
    how_to_reach: string;
    rent_in_sq_ft: number;
    office_type: string;
    other_detail: OtherDetail;
    security_deposit: string;
    floor: string;
    monthly_maintenance: string;
    monthly_maintenance_amount: string;
    facilities: OfficeSpaceFacilityRow[];
    beds: number;
    breakfast: FoodOption;
    dinner: FoodOption;
    lunch: FoodOption;
    food_and_beverage: string;
    is_electricity_bill_included: boolean;
    rent_per_bed: number;
    type_of_co_living: string;
    ratings: string;
    spaceTag: string;
    options: OfficeSpaceOtherDetailOptions;
  }

  export interface OfficeSpace extends CoworkingModel.WorkSpace {
    other_detail: OfficeSpaceOtherDetail;
    builder: BuilderModel.Builder;
    building: SubBuilderModel.SubBuilder;
  }

  export interface OfficeSpacesListResponse {
    data: OfficeSpace[];
    meta?: {
      limit?: number;
      total?: number;
      totalRecords?: number;
      cityId?: string;
      source?: string;
      message?: string;
    };
  }

  export type Builder = BuilderModel.Builder;
  export type SubBuilder = SubBuilderModel.SubBuilder;
}
