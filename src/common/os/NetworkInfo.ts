import * as systeminformation from 'systeminformation';

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
        .filter((ip) => ip && !this.isPrivateIP(ip)); // 过滤掉无效的地址
      return ipAddresses;
    } catch (error) {
      console.error('获取 IP 地址时出错:', error);
      throw new Error('无法获取 IP 地址');
    }
  }
  // 检查 IP 地址是否为私有地址
  private isPrivateIP(ip: string): boolean {
    return (
      ip.startsWith('10.') || // 10.0.0.0 - 10.255.255.255
      ip.startsWith('192.168.') || // 192.168.0.0 - 192.168.255.255
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(ip) || // 172.16.0.0 - 172.31.255.255
      ip === '127.0.0.1' // 本地回环地址
    );
  }
}

// 使用示例
const networkInfo = new NetworkInfo();
export default networkInfo;
// networkInfo
//   .getIPAddresses()
//   .then((ipAddresses) => {
//     console.log('IP 地址:', ipAddresses);
//   })
//   .catch((error) => {
//     console.error(error.message);
//   });
