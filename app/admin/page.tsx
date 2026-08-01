import Header from "./components/Header";
import StatsCards from "./components/StatsCards";
import OrderForm from "./components/OrderForm";
import DeliveryForm from "./components/delivery/DeliveryForm";
import SearchForm from "./components/SearchForm";
import QuickActions from "./components/QuickActions";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-4">
        <Header />

        <StatsCards />

        <OrderForm />

        <DeliveryForm />

        <SearchForm />

        <QuickActions />
      </div>
    </main>
  );
}