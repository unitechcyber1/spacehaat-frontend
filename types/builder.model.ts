/**
 * Builder (developer) model and nested types — mirrors Angular `Builder`.
 * Also defines `Status`, `EnquiryStatus`, `Geometry`, and `ContactDetail` used with office-space payloads.
 */

export namespace BuilderModel {
  export enum Status {
    PENDING = "pending",
    ENABLE = "approve",
    DISABLE = "reject",
    DELETE = "delete",
  }

  export enum EnquiryStatus {
    IN_QUEUE = "in-queue",
    FOLLOW_UP = "follow-up",
    RESOLVED = "resolved",
  }

  export interface Geometry {
    type: "Point";
    coordinates: unknown;
  }

  export interface ContactDetail {
    designation: string;
    name: string;
    phone_number: string;
  }

  export interface BuilderImage {
    image: unknown;
    order: number;
    s3_link: string;
  }

  export interface BuilderOverview {
    starting_price: string;
    configuration: string;
    area: string;
    comercial_projects: string;
    residential_projects: string;
  }

  export interface BuilderMetroDetail {
    name: string;
    is_near_metro: boolean;
    distance: number;
  }

  export interface BuilderShuttlePoint {
    name: string;
    is_near: boolean;
    distance: number;
  }

  export interface BuilderLocation {
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
    metro_detail: BuilderMetroDetail;
    address: string;
    shuttle_point: BuilderShuttlePoint;
  }

  export interface BuilderGalleryImage {
    image: unknown;
    order: number;
  }

  export interface BuilderSocialMedia {
    facebook: string;
    twitter: string;
    instagram: string;
  }

  export interface BuilderSocialNetworkForSeo {
    title: string;
    description: string;
    image: unknown;
  }

  export interface BuilderSEO {
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
    twitter: BuilderSocialNetworkForSeo;
    open_graph: BuilderSocialNetworkForSeo;
  }

  export interface BuilderPopularFlag {
    value: boolean;
    order: number;
  }

  export interface Builder {
    id: string;
    name: string;
    description: string;
    isResidential: boolean;
    isCommercial: boolean;
    projects: string;
    establish_year: string;
    builder_logo: BuilderImage;
    overview: BuilderOverview;
    video_link: string;
    currency_code: string;
    country_dbname: string;
    email: string;
    website_Url: string;
    images: BuilderGalleryImage[];
    social_media: BuilderSocialMedia;
    seo: BuilderSEO;
    location: BuilderLocation;
    is_active: boolean;
    status: Status;
    slug: string;
    priority: unknown;
    is_popular: BuilderPopularFlag;
    user: string;
    createdAt: Date;
    expireAt: Date;
    added_by_user: string;
    geometry: Geometry;
    ratings: string;
    spaceTag: string;
  }
}
