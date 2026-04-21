/**
 * Coworking API types — thin re-exports of {@link CoworkingModel} so imports stay stable
 * (`CoworkingApiWorkspace`, etc.) while the canonical shape lives in `coworking-workspace.model.ts`.
 */

import { CoworkingModel } from "./coworking-workspace.model";

export type CoworkingApiSeoMeta = CoworkingModel.SeoMeta;
export type CoworkingApiCity = CoworkingModel.City;
export type CoworkingApiMicroLocation = CoworkingModel.MicroLocation;
export type CoworkingApiWorkspaceLocation = CoworkingModel.Location;
export type CoworkingApiFacility = CoworkingModel.Facility;
export type CoworkingApiAmenity = CoworkingModel.Amenity;
export type CoworkingApiPlan = CoworkingModel.Plan;
export type CoworkingApiImageAsset = CoworkingModel.ImageAsset;
export type CoworkingApiWorkspaceImage = CoworkingModel.Image;
export type CoworkingApiBrandImage = CoworkingModel.Image;
export type CoworkingApiBrand = CoworkingModel.Brand;
export type CoworkingApiGeometry = CoworkingModel.Geometry;
export type CoworkingApiSpaceContactDetails = CoworkingModel.SpaceContactDetails;
export type CoworkingApiWorkingHours = CoworkingModel.WorkingHours;
export type CoworkingApiCalendar = CoworkingModel.Calendar;
export type CoworkingApiWorkspace = CoworkingModel.WorkSpace;
export type CoworkingApiPriceFilter = CoworkingModel.PriceFilter;
export type CoworkingApiSizeFilter = CoworkingModel.SizeFilter;

export const WORKSPACE_PLAN = CoworkingModel.WorkSpacePlan;
export type WorkSpacePlanSlug = CoworkingModel.WorkSpacePlanSlug;
export const WORKSPACE_DAY = CoworkingModel.WorkSpaceDay;
export type WorkSpaceDaySlug = CoworkingModel.WorkSpaceDaySlug;
export const WORKSPACE_PLAN_TYPE_LABELS = CoworkingModel.WorkSpacePlanTypeLabels;

/** Response wrapper when API returns `{ data: WorkSpace[] }` — alias of {@link CoworkingModel.WorkSpacesListResponse}. */
export type CoworkingWorkSpacesApiResponse = CoworkingModel.WorkSpacesListResponse;
