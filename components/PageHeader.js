import React from "react";
import Link from "next/link";
import { auth } from "../firebase/base";
import { signOut } from "firebase/auth";

export const PageHeader = () => {
  const headerStyles={
    position: 'relative',
	  top: '0',
	  padding: '10px 1rem 13px 1rem',
	  color: '#fff',
	  backgroundColor: '#000',
	  display: 'grid',
    gridTemplateColumns: '50% 50%',
	  placeItems: 'center',
	  borderBottom: '3px solid rgb(0, 204, 255)',
    cursor: 'pointer'
  }

  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
    fontSize: '18',
    fontWeight: '500'
  }

  return (
    <>
      <header style={headerStyles}>
        <div>
          <Link href="/">
            <a style={linkStyle}>
              DATÉ UN DATE
            </a>
          </Link>
        </div>
        <div>
          <h4 style={{textDecoration:'underline'}} onClick={() => signOut(auth)}>
            salir
            {"     "}
            <ion-icon name="exit-outline"></ion-icon>
          </h4>
        </div>
      </header>
    </>
  );
};