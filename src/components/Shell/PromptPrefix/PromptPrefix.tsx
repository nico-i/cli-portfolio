interface PromptPrefixProps {
  username: string;
  domain: string;
  className?: string;
}

export const PromptPrefix = ({
  username,
  domain,
  className,
}: Readonly<PromptPrefixProps>) => {
  return (
    <span className={className}>
      <span className="text-info-500">{`${username}@${domain}`}</span>
      <span>:</span>&nbsp;
      <span className="text-log-500">~</span>
      <span>$</span>&nbsp;
    </span>
  );
};
