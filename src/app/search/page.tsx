import SearchDetail from '@/components/searchDetail';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = '' } = await searchParams;

  return (
    <div>
      <SearchDetail q={q} />
    </div>
  );
}
