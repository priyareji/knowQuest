interface IGenerateTokens {
    generateAccessToken(): Promise<string>;
    generateRefreshToken(): Promise<string>;
}
