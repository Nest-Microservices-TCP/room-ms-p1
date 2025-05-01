export interface MetadataException {
  className: string;
  methodName: string;
}

export interface CustomExceptionDetails {
  exception_message: string;
  metadata?: MetadataException;
}
