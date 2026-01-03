export const STATES = {
  Johor: "Johor",
  Kedah: "Kedah",
  Kelantan: "Kelantan",
  Melaka: "Melaka",
  Negeri_Sembilan: "Negeri Sembilan",
  Pahang: "Pahang",
  Perak: "Perak",
  Perlis: "Perlis",
  Penang: "Penang",
  Sabah: "Sabah",
  Sarawak: "Sarawak",
  Selangor: "Selangor",
  Terengganu: "Terengganu",
  All: "All",
} as const;

export type State = (typeof STATES)[keyof typeof STATES];
