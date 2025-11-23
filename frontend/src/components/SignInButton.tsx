interface SignInButtonProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SignInButton({ setOpen }: SignInButtonProps) {
    return (
        <>
            <button className="btn btn-secondary" onClick={() => setOpen(true)}>
                Sign In
            </button>
        </>
    );
}
