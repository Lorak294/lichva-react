export const roles = Object.freeze({
    user: 1,
    admin: 2,
    employee: 3,
});

export const job_categories = Object.freeze({
    architecture_engineering: 1,
    arts_culture_entertainment: 2,
    business_management_administration: 3,
    communications: 4,
    community_socialServices: 5,
    education: 6,
    science_technology: 7,
    installation_repair_maintenance: 8,
    farming_fishing_forestry: 9,
    government: 10,
    health_medicine: 11,
    law_public_policy: 12,
    sales: 13,
    other: 14
});

export const id_types = Object.freeze({
    ID : 1,
    passport: 2,
    PESEL: 3
});

export const offer_status = Object.freeze({
  offered : 1,
  waiting_for_acceptance: 2,
  accepted: 3,
  declined: 4,
});
