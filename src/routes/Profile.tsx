import EditProfileForm from "@/components/forms/EditProfileForm";
import { useAuth } from "@/providers/AuthProvider";
import { faHeart, faUserCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();

  if (!user) return <div>401 Unauthenticated</div>;

  return (
    <main className="text-[#444444] dark:text-[#9ca9b9]">
      <div className="bg-[#f1f1f1] dark:bg-[#45475a]">
        <div className="max-w-5xl m-auto flex flex-col justify-left md:flex-row md:justify-left items-center gap-4 py-[50px]">
          <img
            src={user?.image || "/no-avatar.jpg"}
            alt=""
            width={180}
            height={180}
            className="rounded-full"
          />
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl md:text-5xl">
              Hallo,{" "}
              <span className="text-[#6e6dfb] font-semibold">{user.username}</span>
            </h1>
            <div className="bg-[#ffffff] dark:bg-[#3b3c4c] px-6 py-2 rounded-md flex items-center justify-center gap-2 font-semibold">
              <FontAwesomeIcon icon={faHeart} color="#f27474" />
              123 Series Favorited
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-5xl m-auto flex flex-col md:flex-row gap-4 my-5 px-4 w-full">
        <div className="flex flex-col gap-4 w-full md:w-[180px]">
          <Link
            to="#"
            className="flex items-center gap-2 px-[15px] py-[8px] rounded-md font-semibold text-base text-white bg-[#6e6dfb]"
          >
            <FontAwesomeIcon icon={faUserCog} />
            Edit Profile
          </Link>
        </div>

        <div className="border-t-4 md:border-t-0 md:border-l-4 border-[#f1f1f1] dark:border-[#3b3c4c] py-4 md:py-0 md:px-4 w-full">
          <h2 className="text-2xl font-semibold mb-5">
            <span className="text-[#6e6dfb]">Edit</span> Profile
          </h2>
          <EditProfileForm data={user} />
        </div>
      </div>
    </main>
  );
};

export default Profile;
