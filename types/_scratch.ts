type Department = {};

type OfficeLocation = {};

type User = {
  email: string;
  displayName: string;
  firstName: string;
  preferredName: string;
  lastName: string;
  preferredPronouns?: "";
  jobTitle: string;
  department: Department;
  officeLocation: OfficeLocation;
  createdAt: Date;
  phone: string;
  phoneAlt: string;
  address: "";
};
type AssetType =
  | "Laptop"
  | "Desktop"
  | "Tablet"
  | "Cell Phone"
  | "Office Phone"
  | "Software"
  | "License";

type ConditionStatus =
  | "damaged"
  | "very poor"
  | "worn"
  | "average"
  | "good"
  | "excellent"
  | "new";

type AssetStatus =
  | "recycled"
  | "donated"
  | "assigned"
  | "available"
  | "repair"
  | "lost"
  | "ordered";

type Asset = {
  name: string;
  description: string;
  image: null;
  type: AssetType;
  manufacturer: Brand;
  model?: string;
  distrubutor: string;
  orderNo: string; // eventually a reference to an asset order
  //  purchaseDate: Date;
  //  purchasePrice: number;
  assignedTo: User;
  previouslyAssignedTo: User[];
  condition: ConditionStatus;
  conditionNotes: string[];
  status: AssetStatus;
};

type Brand = {
  name: string;
  logo: null;
};
["Dell", "HP", "Windows", "Apple", "Samsung"];

interface Computer extends Asset {
  computerName: string;
  ram: "";
  storage: "";
}

export default null;
