/* Children */

const ErrorMessage = ({ children }: { children: React.ReactNode }) => {
  return <div className="error">{children}</div>;
};

export default ErrorMessage;
