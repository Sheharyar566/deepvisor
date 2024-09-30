import Link from "next/link";

interface Props {
  id: string;
  featured?: boolean;
  type: string;
  pricing: string;
  description: string;
  features: string[];
  buttonLink: string;
  buttonText: string;
}

const PricingOption = ({
  id,
  features,
  featured,
  type,
  pricing,
  description,
  buttonLink,
  buttonText,
}: Props) => (
  <div className="flex h-full flex-col gap-[0.7rem] overflow-hidden rounded-sm border border-stroke bg-white p-13 shadow-default dark:border-strokedark dark:bg-boxdark md:gap-[1.875rem]">
    <div className="flex flex-col gap-4">
      <p className="from-purple to-pink text-md flex flex-row items-center gap-1 self-start rounded-lg bg-gradient-to-tr px-3.5 py-2 font-medium uppercase tracking-wide text-boxdark dark:text-white">
        <span>{type}</span>
        {/* {featured && <Image src={Images.Crown} alt="Featured plan" />} */}
      </p>

      <p className="text-[2.625rem] font-bold leading-[3.4375rem] text-black dark:text-white">
        {pricing}
      </p>

      <p>{description}</p>
    </div>

    <div className="flex flex-col gap-4">
      <p>FEATURES</p>

      <ul className="ml-5 flex list-disc flex-col gap-0 marker:text-[#88B702] md:gap-4">
        {features.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>

    <div className="mt-auto">
      <Link href={buttonLink} className="btn-primary mt-10 w-full">
        {buttonText}
      </Link>
    </div>
  </div>
);

export default PricingOption;
