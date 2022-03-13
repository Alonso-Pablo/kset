import { ObjectId } from 'mongoose'

interface CassetteStripsColors {
  upper: string;
  middle: string;
  bottom: string;
}

export interface CassetteColors {
  body: string;
  holes: string;
  strips: CassetteStripsColors;
}

export interface CassetteInterface {
  id?: string;
  _id: ObjectId;
  author: string;
  songName: string;
  length: number;
  chunkSize: number;
  uploadDate: Date;
  filename: string;
  // color: CassetteColors; For future feat
}
