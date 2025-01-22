export type Surah ={
  surahName: string;
  surahNameArabic: string;
  surahNameArabicLong: string;
  surahNameTranslation: string;
  revelationPlace: string;
  totalAyah: number;
  surahNo: number;
  audio: Audio;
  english: string[];
  arabic1: string[];
  arabic2: string[];
  bengali: string[];
}

export interface Audio {
  "1": N1;
  "2": N2;
  "3": N3;
}

export interface N1 {
  reciter: string;
  url: string;
  originalUrl: string;
}

export interface N2 {
  reciter: string;
  url: string;
  originalUrl: string;
}

export interface N3 {
  reciter: string;
  url: string;
  originalUrl: string;
}
