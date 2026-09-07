import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/post-title";
import CoverImage from "./cover-image";

type Props = {
    title: string;
    coverImage: string;
    date: string;
};

export function PostHeader({ title, coverImage, date }: Props) {
    return (
        <>
            <div className="flex justify-center mb-8">
                <PostTitle>{title}</PostTitle>
            </div>
            <div className="hidden md:block md:mb-12"></div>
            <div className="mb-8 md:mb-16 sm:mx-0">
                <div className="w-full max-w-4xl mx-auto">
                    <div className="shadow-lg rounded-lg overflow-hidden">
                        <CoverImage
                            title={title}
                            src={coverImage}
                            className="object-cover w-full h-full"
                            priority={true}
                        />
                    </div>
                </div>
            </div>
            <div className="max-w-4xl mx-auto">
                <div className="block md:hidden mb-6"></div>
                <div className="mb-6 text-lg">
                    <DateFormatter dateString={date} />
                </div>
            </div>
        </>
    );
}