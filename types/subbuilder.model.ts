/**
 * SubBuilder (building / project) model and nested types — mirrors Angular `SubBuilder`.
 * Reuses {@link BuilderModel.Status} and {@link BuilderModel.Geometry} from `./builder.model`.
 */

import type { BuilderModel } from "@/types/builder.model";

export namespace SubBuilderModel {
  export interface SubBuilderFloorPlan {
    name: string;
    rent_price: string;
    sale_price: string;
  }

  export interface SubBuilderPlans {
    floor_plans: SubBuilderFloorPlan[];
    category_name: string;
    planId: string;
    price: string;
    area: string;
  }

  export interface SubBuilderOverview {
    configuration: string;
    build_up_area: string;
    project_type: string;
    project_size: string;
    apartment_design: string;
    is_sale: boolean;
    is_rent: boolean;
    is_rera_approved: boolean;
    is_zero_brokerage: boolean;
  }

  export interface SubBuilderAmenity {
    id: string;
    category: string;
    name: string;
    icon: string;
    for_flatspace: boolean;
    for_office: boolean;
    priority: {
      for_flatspace: { order: number };
      for_office: { order: number };
    };
  }

  export interface SubBuilderAllAmenities {
    residential: SubBuilderAmenity[];
    commercial: SubBuilderAmenity[];
  }

  export interface NearBYPlaces {
    lankmark: string;
    distance: string;
    image: unknown;
  }

  export interface SubBuilderMetroDetail {
    name: string;
    is_near_metro: boolean;
    distance: number;
  }

  export interface SubBuilderShuttlePoint {
    name: string;
    is_near: boolean;
    distance: number;
  }

  export interface SubBuilderLocation {
    name: string;
    name1: string;
    floor: string;
    address1: string;
    city: unknown;
    micro_location: unknown;
    state: string;
    country: unknown;
    postal_code: string;
    landmark: string;
    landmark_distance: string;
    ferry_stop_landmark: string;
    ferry_stop_distance: string;
    bus_stop_landmark: string;
    bus_stop_distance: string;
    taxi_stand_landmark: string;
    taxi_stand_distance: string;
    tram_landmark: string;
    tram_distance: string;
    latitude: number;
    longitude: number;
    is_near_metro: boolean;
    is_ferry_stop: boolean;
    is_bus_stop: boolean;
    is_taxi_stand: boolean;
    is_tram: boolean;
    metro_detail: SubBuilderMetroDetail;
    address: string;
    shuttle_point: SubBuilderShuttlePoint;
    near_by_places: NearBYPlaces[];
  }

  export interface SubBuilderGalleryImage {
    image: unknown;
    order: number;
  }

  export interface SubBuilderSocialMedia {
    facebook: string;
    twitter: string;
    instagram: string;
  }

  export interface SubBuilderSocialNetworkForSeo {
    title: string;
    description: string;
    image: unknown;
  }

  export interface SubBuilderSEO {
    id: string;
    page_title: string;
    script: string;
    title: string;
    description: string;
    robots: string;
    keywords: string;
    footer_description: string;
    footer_title: string;
    url: string;
    status: boolean;
    path: string;
    twitter: SubBuilderSocialNetworkForSeo;
    open_graph: SubBuilderSocialNetworkForSeo;
  }

  export interface SubBuilderPopularFlag {
    value: boolean;
    order: number;
  }

  export interface SubBuilder {
    id: string;
    builder: unknown;
    name: string;
    description: string;
    isOfficeSpace: boolean;
    isMoreCommercial: boolean;
    isTopCommercial?: boolean;
    overview: SubBuilderOverview;
    amenties: SubBuilderAmenity[];
    allAmenities: SubBuilderAllAmenities;
    plans: SubBuilderPlans[];
    currency_code: string;
    country_dbname: string;
    email: string;
    website_Url: string;
    images: SubBuilderGalleryImage[];
    social_media: SubBuilderSocialMedia;
    seo: SubBuilderSEO;
    location: SubBuilderLocation;
    is_active: boolean;
    status: BuilderModel.Status;
    slug: string;
    priority: unknown;
    spaceTag: string;
    ratings: string;
    is_popular: SubBuilderPopularFlag;
    user: string;
    createdAt: Date;
    expireAt: Date;
    added_by_user: string;
    geometry: BuilderModel.Geometry;
  }
}
