import markdownStyles from "./markdown-styles.module.css";

type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  return (
    <div className="max-w-3xl mx-auto">
      <div
        className={`${markdownStyles.markdown} markdown p-6 text-black  dark:text-[#94a3b8]`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
