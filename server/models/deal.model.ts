import mongoose, { Schema, Document } from 'mongoose';

export interface IDeal extends Document {
    title: string;
    company: string;
    value: number;
    stage: string;
    ownerAvatar: string;
    type: string;
    typeColor: string;
}

const DealSchema = new Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    value: { type: Number, required: true },
    stage: { type: String, required: true },
    ownerAvatar: { type: String, required: true },
    type: { type: String, required: true },
    typeColor: { type: String, required: true }
}, {
    timestamps: true
});

export default mongoose.model<IDeal>('Deal', DealSchema);
