export default async function Home() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/test`);

        if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
        }

        const data = await res.json();
        console.log(data);

        return (
            <>
                <p>Hello world!</p>
                {data && <p>{data.message}</p>}
            </>
        );
    } catch (error) {
        console.error(error);
    }

    return (
        <>
            <p>Hello world!</p>
        </>
    );
}
