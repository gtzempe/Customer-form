import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, type ChangeEvent, type FormEvent } from "react";

type FormValues = {
  surname: string;
  name: string;
  address: string;
  telephone: string;
};

type Customers = FormValues & { id: number };

function CustomerForm() {
  const [formData, setFormData] = useState<FormValues>({
    surname: "",
    name: "",
    address: "",
    telephone: "",
  });
  const [customers, setCustomers] = useState<Customers[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formData.surname.trim() || !formData.name.trim()) {
      setError("Surname and Name are required!");
      return;
    }
    setError(null);

    if (isEditing !== null) {
      setCustomers((prev) =>
        prev.map((customer) =>
          customer.id === isEditing ? { ...customer, ...formData } : customer
        )
      );
      setIsEditing(null);
    } else {
      const nextId =
        customers.length > 0 ? Math.max(...customers.map((c) => c.id)) + 1 : 1;

      setCustomers((prev) => [
        ...prev,
        {
          id: nextId,
          ...formData,
        },
      ]);
    }

    setFormData({
      surname: "",
      name: "",
      address: "",
      telephone: "",
    });
    console.log(formData);
  }

  function handleClearForm() {
    setFormData({
      surname: "",
      name: "",
      address: "",
      telephone: "",
    });
  }

  function handleDelete(id: number) {
    setCustomers((prev) => prev.filter((customer) => customer.id !== id));
  }

  function handleEdit(id: number) {
    const customerToEdit = customers.find((customer) => customer.id === id);
    if (customerToEdit) {
      setFormData({
        surname: customerToEdit.surname,
        name: customerToEdit.name,
        address: customerToEdit.address,
        telephone: customerToEdit.telephone,
      });
      setIsEditing(id);
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-10 space-y-5 rounded-xl border p-6 shadow-sm"
      >
        <h2 className="text-center">Customer information</h2>

        <div>
          <label className="block text-sm ml-1 font-medium text-gray-700">
            Surname
          </label>
          <input
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            type="text"
            placeholder="Surname..."
            className="border-2 rounded-lg mt-1 px-2 py-2 w-full focus:border-black focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm ml-1 font-medium text-gray-700">
            Name
          </label>
          <input
            name="name"
            value={formData.name}
            type="text"
            onChange={handleChange}
            placeholder="Name..."
            className="border-2 rounded-lg mt-1 px-2 py-2 w-full focus:border-black focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm ml-1 font-medium text-gray-700">
            Address
          </label>
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            type="text"
            placeholder="Address..."
            className="border-2 rounded-lg mt-1 px-2 py-2 w-full focus:border-black focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm ml-1 font-medium text-gray-700">
            Telephone
          </label>
          <input
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            type="text"
            placeholder="Telephone..."
            className="border-2 rounded-lg mt-1 px-2 py-2 w-full focus:border-black focus:outline-none mb-5"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex justify-around">
          <button
            onClick={handleClearForm}
            type="reset"
            className="rounded-lg w-30 bg-red-400 py-2 text-white transition hover:bg-red-600 "
          >
            Clear
          </button>
          <button
            type="submit"
            className="rounded-lg w-30 bg-blue-400 py-2 text-white transition hover:bg-blue-600"
          >
            {isEditing !== null ? "Update" : "Submit"}
          </button>
        </div>
      </form>
      <Table className="mt-10 w-250 mx-auto">
        <TableCaption>A list of customers.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Surname</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Telephone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell className="font-medium w-20">{customer.id}</TableCell>
              <TableCell>{customer.surname}</TableCell>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.address}</TableCell>
              <TableCell>{customer.telephone}</TableCell>
              <TableCell className="flex gap-2">
                <button
                  onClick={() => handleEdit(customer.id)}
                  className="text-blue-500 cursor-pointer border-2 rounded-2xl "
                >
                  ✍️
                </button>
                <button
                  onClick={() => handleDelete(customer.id)}
                  className="text-red-500 cursor-pointer border-2 rounded-2xl"
                >
                  ❌
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default CustomerForm;
