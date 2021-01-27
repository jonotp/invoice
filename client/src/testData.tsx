import { IInvoice } from "./types";

// Folder containing test data
const TestInvoice: IInvoice = {
  invoiceId: "1",
  supplier: {
    userId: "",
    businessId: "123 456 789",
    name: "The Krusty Krab",
    address: "1 Krusty Street, Bikini Bottom, NSW, 2500",
    email: "krusty_krab@thekrustkrab.com",
    phone: "0400000000",
    logo:
      // "https://res.cloudinary.com/teepublic/image/private/s--Neg6ccrS--/b_rgb:fffffe,t_Heather Preview/c_limit,f_jpg,h_630,q_90,w_630/v1542507929/production/designs/3524997_0.jpg",
      // "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSsnib4Snq5L2UW7EHiCZd351tUzVrOG2MiCg&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT687jtRizt6a0o9ZX3tImT8KhWInsT6MjmFg&usqp=CAU",
  },
  customer: {
    customerId: "",
    businessId: "",
    name: "Sponge Bob",
    address: "1 Customer Street, Bikini Botom, QLD, 2101",
    email: "customer@thekrustkrab.com",
    phone: "0400000000",
  },
  hasTax: true,
  taxRatePercentage: 10,
  invoiceNo: "INV001",
  issueDate: new Date(),
  notes: `Tempor reprehenderit dolore labore eiusmod est dolore sint consectetur nisi non laboris culpa. Amet eiusmod aliqua voluptate amet. Deserunt do est fugiat excepteur occaecat magna dolore ex ullamco incididunt consequat. Deserunt Lorem est eu ex cupidatat Lorem pariatur. Officia id officia mollit fugiat ea. Et excepteur mollit dolor dolor laboris magna ut.

Tempor officia sunt ipsum id cillum in cillum ex pariatur minim ut laborum consectetur esse. Quis enim adipisicing deserunt eu ad do consectetur eu pariatur nostrud veniam. Irure irure esse adipisicing Lorem consequat eu laborum cillum ad. Veniam ex ut esse eu sunt.`,
  dateCreated: new Date(),
  dateUpdated: new Date(),
  items: [
    {
      itemId: "1",
      description: "Burgers",
      price: 10.0,
      quantity: 4,
    },
    {
      itemId: "2",
      description: "Pickles",
      price: 1.1,
      quantity: 10,
    },
    {
      itemId: "3",
      description: "Extra sauce",
      price: 0.5,
      quantity: 5,
    },
  ],
};

export default TestInvoice;
