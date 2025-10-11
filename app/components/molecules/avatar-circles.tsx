import { cn } from "~/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/avatar";

interface AvatarData {
  imageUrl: string;
  profileUrl: string;
  name?: string;
}

interface AvatarCirclesProps {
  className?: string;
  numPeople?: number;
  avatarUrls: AvatarData[];
}

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2);
};

export const AvatarCircles = ({
  numPeople,
  className,
  avatarUrls,
}: AvatarCirclesProps) => {
  return (
    <div className={cn("z-10 flex -space-x-4 rtl:space-x-reverse", className)}>
      {avatarUrls.map((avatar, index) => (
        <a
          key={index}
          href={avatar.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Avatar className="size-10 border-2 border-white dark:border-gray-800">
            <AvatarImage src={avatar.imageUrl} alt={avatar.name || `Avatar ${index + 1}`} />
            <AvatarFallback className="text-xs font-medium">
              {avatar.name ? getInitials(avatar.name) : `A${index + 1}`}
            </AvatarFallback>
          </Avatar>
        </a>
      ))}
      {(numPeople ?? 0) > 0 && (
        <a
          className="flex size-10 items-center justify-center rounded-full border-2 border-white bg-black text-center text-xs font-medium text-white hover:bg-gray-600 dark:border-gray-800 dark:bg-white dark:text-black"
          href=""
        >
          +{numPeople}
        </a>
      )}
    </div>
  );
};
