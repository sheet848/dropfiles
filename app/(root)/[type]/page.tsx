const Page = async ({
    searchParams,
    params,
}: {
    searchParams: Promise<{ query: string; filter: string }>;
    params: Promise<{ type: string }>;
}) => {
    console.log("params:", params);

    const type = ((await params)?.type as string) || "";
    // console.log("type:", type);

  return (
    <div>{type}</div>
  )
}

export default Page;