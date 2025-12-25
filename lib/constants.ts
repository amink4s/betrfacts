// lib/constants.ts
export const ADMIN_FIDS = [477126, 3642, 206967, 311933];

export const isUserAdmin = (fid: number) => ADMIN_FIDS.includes(fid);