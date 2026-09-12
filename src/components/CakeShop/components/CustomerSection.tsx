import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  addCustomer,
  fetchCustomers,
  selectCustomer,
} from "../../../redux/slices/customers.slice";

export default function CustomerSection() {
  const dispatch = useAppDispatch();
  const {
    data: customers,
    isLoading,
    error,
  } = useAppSelector((state) => state.customers);

  const [customerName, setCustomerName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const createNewCustomer = async () => {
    const name = customerName.trim();
    if (!name) return;
    try {
      await dispatch(addCustomer({ name }));
      await dispatch(fetchCustomers());
    } catch (error) {
      setErrorMessage(error as string);
    } finally {
      setCustomerName("");
    }
  };

  const handleSelectCustomer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const customer = customers?.find(
      (customer) => customer.id === Number(e.target.value),
    );
    if (!customer) return;
    dispatch(selectCustomer(customer));
  };

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
    } else {
      setErrorMessage("");
    }
  }, [error]);

  const customerOptions = useMemo(() => {
    const options = [
      {
        label: "Choose a customer",
        value: "",
        disabled: true,
      },
      ...customers?.map((customer) => ({
        label: customer.name,
        value: customer.id,
        disabled: false,
      })),
    ];
    return options;
  }, [customers]);

  return (
    <section className="card customer-card">
      <div className="card-heading">
        <div>
          <span className="section-number">01</span>
          <h3>Customers</h3>
        </div>
      </div>

      <div className="form-grid">
        <label htmlFor="customer-name">Customer name</label>
        <input
          id="customer-name"
          type="text"
          placeholder="e.g. Rahul Bakery"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <button
          className="ghost-button"
          type="button"
          onClick={createNewCustomer}
          disabled={isLoading}
        >
          + New customer
        </button>
      </div>

      <div className="select-row">
        <label className="wide-field">
          Select customer
          <select defaultValue="" onChange={handleSelectCustomer}>
            {customerOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </section>
  );
}
