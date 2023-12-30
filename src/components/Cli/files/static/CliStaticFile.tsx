import { Link } from '@/components/Link';

interface CliStaticFileResultProps {
  fileName: string;
}

export const CliStaticFileResult = ({
  fileName,
}: Readonly<CliStaticFileResultProps>) => (
  <Link href={`/${fileName}`}>{fileName}</Link>
);
