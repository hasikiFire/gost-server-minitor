import systeminformation from 'systeminformation';

class NetworkInfo {
  async getIPAddresses(): Promise<string[]> {
    try {
      const networkData = await systeminformation.networkInterfaces();

      // 确保 networkData 是数组
      const interfaces = Array.isArray(networkData)
        ? networkData
        : [networkData];

      const ipAddresses = interfaces
        .flatMap((iface) => iface.ip4 || []) // 获取 IPv4 地址
        .filter((ip) => ip); // 过滤掉无效的地址
      return ipAddresses;
    } catch (error) {
      console.error('获取 IP 地址时出错:', error);
      throw new Error('无法获取 IP 地址');
    }
  }
}

// 使用示例
const networkInfo = new NetworkInfo();
networkInfo
  .getIPAddresses()
  .then((ipAddresses) => {
    console.log('IP 地址:', ipAddresses);
  })
  .catch((error) => {
    console.error(error.message);
  });
