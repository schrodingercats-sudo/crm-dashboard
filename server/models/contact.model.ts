import mongoose, { Schema, Document } from 'mongoose';

export interface ILeadOwner {
    name: string;
    avatar: string;
}

export interface IContact extends Document {
    name: string;
    avatar: string;
    email: string;
    phone: string;
    purpose: string;
    amount: number;
    progress: number;
    stage: string;
    leadOwners: ILeadOwner[];
}

const LeadOwnerSchema = new Schema({
    name: { type: String, required: true },
    avatar: { type: String, required: true }
});

const ContactSchema = new Schema({
    name: { type: String, required: true },
    avatar: { type: String, required: false, default: '' },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    purpose: { type: String, required: true },
    amount: { type: Number, required: true },
    progress: { type: Number, required: true },
    stage: { type: String, required: true },
    leadOwners: { type: [LeadOwnerSchema], default: [] }
}, {
    timestamps: true
});

export default mongoose.model<IContact>('Contact', ContactSchema);
