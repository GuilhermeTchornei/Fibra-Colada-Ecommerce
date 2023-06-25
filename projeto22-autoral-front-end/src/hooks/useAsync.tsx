import { useEffect, useState } from "react";

export default function useAsync<T>(handler: (...args: any | null) => Promise<T>, immediate = true) {
    const [data, setData] = useState<T>();
    const [loading, setLoading] = useState<boolean>(immediate);
    const [error, setError] = useState<any | null>(null);

    const act = async (...args: any) => {
        setLoading(true);
        setError(null);

        try {
            const _data = await handler(...args);
            setData(_data);
            setLoading(false);
            return _data as T;
        }
        catch (err: any) {
            setError(err);
            setLoading(false);
            throw err;
        }
    };

    useEffect(() => {
        if (immediate) act();
    }, []);

    return {
        data, loading, error, act
    };
}