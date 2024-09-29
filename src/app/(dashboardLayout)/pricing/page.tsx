import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const PricingPage = () => {
  return (
    <div className="mx-auto max-w-242.5">
      <Breadcrumb pageName="Pricing" />

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          Plan 1
        </div>
        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          Plan 2
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
