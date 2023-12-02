interface PromptPrefixProps {
  username: string;
  domain: string;
  className?: string;
}

export default function PromptPrefix({
  username,
  domain,
  className,
}: PromptPrefixProps) {
  return (
    <span className={className}>
      <span className="text-info-500">{`${username}@${domain}`}</span>
      <span>:</span>&nbsp;
      <span className="text-log-500">~</span>
      <span>$</span>&nbsp;
    </span>
  );
}
