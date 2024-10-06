import { prisma } from "@/server/prisma";
import { Metadata } from "next";
import { auth } from "@/server/auth";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import UserImageForm from "./imageForm";
import UserDataForm from "./userDataForm";

export const metadata: Metadata = {
  title: "Deepvisor Settings",
  description: "Deepvisor Settings",
};

const Page = async () => {
  const loggedInUser = await auth();
  const userId = loggedInUser?.user?.id;

  if (!userId) {
    throw new Error("You were not supposed to be here");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      image: true,
      name: true,
      phone: true,
      email: true,
      bio: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const { image, ...rest } = user;

  return (
    <div className="mx-auto max-w-270">
      <Breadcrumb pageName="Settings" />

      <div className="grid grid-cols-5 gap-8">
        <UserDataForm {...rest} />
        <UserImageForm image={image} />
      </div>
    </div>
  );
};

export default Page;
