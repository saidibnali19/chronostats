export default function SignUpButton({ setOpen }) {
    return (
        <>
            <button className="btn btn-primary" onClick={() => setOpen(true)}>
                Sign Up
            </button>
        </>
    );
}
