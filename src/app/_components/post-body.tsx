import markdownStyles from "./markdown-styles.module.css";

type Props = {
    content: string;
};

export function PostBody({ content }: Props) {
    return (
        <div className="max-w-4xl mx-auto">
            <div
                className={`${markdownStyles.markdown} markdown p-6 rounded-lg shadow-md transition-all duration-300 bg-white text-black dark:bg-[#0d1117] dark:text-[#94a3b8]`}
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </div>
    );
}