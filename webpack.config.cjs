module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|gltf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  mode: "production",
};
