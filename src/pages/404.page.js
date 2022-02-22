import React from 'react';
import ErrorComponent from '../components/errorComp';

export default function NotFoundPage() {
  return (
    <>
      <ErrorComponent message="Request failed with status code 404" />
    </>
  );
}
