import Link from "next/link";

export function FlaskComponent() {
  return (
    <div className="hero">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-2xl font-bold">You don't have Metamask Flask</h1>
          <p className="py-6">
            You need to install MetaMask Flask extension in order to use this
            snapp.
          </p>
          <Link href='https://metamask.io/flask/' target="_blank">
          <button className="btn btn-primary">Download Flask</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
