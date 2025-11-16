interface SignUpButtonProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SignUpButton({ setOpen }: SignUpButtonProps) {
    return (
        <>
            <button className="btn btn-primary" onClick={() => setOpen(true)}>
                Sign Up
            </button>
        </>
    );
}
