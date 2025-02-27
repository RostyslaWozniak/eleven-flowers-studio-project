import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const imagesData = [
  {
    id: "mgG8Yp1X9p5vsGaHauFs63RSOZqEmv5FCJMAB80ykXWdxUPG",
    name: "img-4.png",
    url: "https://njmm8e6312.ufs.sh/f/mgG8Yp1X9p5vsGaHauFs63RSOZqEmv5FCJMAB80ykXWdxUPG",
  },
  {
    id: "mgG8Yp1X9p5vgA5LvVvBDHwFPNTsfQxucJh5ly7VItpMW4Bz",
    name: "description-2.JPG",
    url: "https://njmm8e6312.ufs.sh/f/mgG8Yp1X9p5vgA5LvVvBDHwFPNTsfQxucJh5ly7VItpMW4Bz",
  },
  {
    id: "mgG8Yp1X9p5vEhNDroK2J1IdPWogmTUXLKAY9QN3fwEekasM",
    name: "double-1.JPG",
    url: "https://njmm8e6312.ufs.sh/f/mgG8Yp1X9p5vEhNDroK2J1IdPWogmTUXLKAY9QN3fwEekasM",
  },
  {
    id: "mgG8Yp1X9p5vfQYcU13AcEKai1sNROF2CSTYBeHqmWk4G3vg",
    name: "bukiet-love-1.JPG",
    url: "https://njmm8e6312.ufs.sh/f/mgG8Yp1X9p5vfQYcU13AcEKai1sNROF2CSTYBeHqmWk4G3vg",
  },
  {
    id: "mgG8Yp1X9p5v2L5cKUdXAGgflnWhTOrC3m0sScIpKe6JYE8Q",
    name: "bukiet-love-2.JPG",
    url: "https://njmm8e6312.ufs.sh/f/mgG8Yp1X9p5v2L5cKUdXAGgflnWhTOrC3m0sScIpKe6JYE8Q",
  },
  {
    id: "mgG8Yp1X9p5vyy2MSRCnHcw0fJdlM8hvzP2TEymuCLpqOaSk",
    name: "sunshine-2.JPG",
    url: "https://njmm8e6312.ufs.sh/f/mgG8Yp1X9p5vyy2MSRCnHcw0fJdlM8hvzP2TEymuCLpqOaSk",
  },
  {
    id: "mgG8Yp1X9p5vxDqAirj2CHVWoFSpRzb0Kvi3Jr7gem5yZY4U",
    name: "sunshine-1.JPG",
    url: "https://njmm8e6312.ufs.sh/f/mgG8Yp1X9p5vxDqAirj2CHVWoFSpRzb0Kvi3Jr7gem5yZY4U",
  },
  {
    id: "mgG8Yp1X9p5vvZlYHd0uN7srXCLGgh8zlYDAwniQcImMOfab",
    name: "balloons.jpg",
    url: "https://njmm8e6312.ufs.sh/f/mgG8Yp1X9p5vvZlYHd0uN7srXCLGgh8zlYDAwniQcImMOfab",
  },
  {
    id: "mgG8Yp1X9p5vabRVrMOQBkN6lL4YuXxhyPqd0mR3FWnMrU7G",
    name: "flower-box.jpg",
    url: "https://njmm8e6312.ufs.sh/f/mgG8Yp1X9p5vabRVrMOQBkN6lL4YuXxhyPqd0mR3FWnMrU7G",
  },
  {
    id: "mgG8Yp1X9p5v72StTVs9SIL2eXMUvbiKtwpYPNEkuxRWcFy0",
    name: "bouquets.jpg",
    url: "https://njmm8e6312.ufs.sh/f/mgG8Yp1X9p5v72StTVs9SIL2eXMUvbiKtwpYPNEkuxRWcFy0",
  },
  {
    id: "mgG8Yp1X9p5vM6AiUEpSJzldaKU2wgf5IChMu9G6PDiNeoV0",
    name: "gift.jpg",
    url: "https://njmm8e6312.ufs.sh/f/mgG8Yp1X9p5vM6AiUEpSJzldaKU2wgf5IChMu9G6PDiNeoV0",
  },
  {
    id: "mgG8Yp1X9p5vWZt1oxTbV9OXzpZhUGHxRN8kK2dsED6nAv0j",
    name: "bouquet-ranunkulus-1.jpg",
    url: "https://njmm8e6312.ufs.sh/f/mgG8Yp1X9p5vWZt1oxTbV9OXzpZhUGHxRN8kK2dsED6nAv0j",
  },
  {
    id: "mgG8Yp1X9p5vR4iEPm7XKCAcQoTO9F3zB07pb5Ywkq2RuW8m",
    name: "bouquet-ranunkulus-2.jpg",
    url: "https://njmm8e6312.ufs.sh/f/mgG8Yp1X9p5vR4iEPm7XKCAcQoTO9F3zB07pb5Ywkq2RuW8m",
  },
  {
    id: "mgG8Yp1X9p5vKCxpzFReMY6VDm8WNosJjy91SA7OxLhIH5Qz",
    name: "bouquet-lizi.jpg",
    url: "https://njmm8e6312.ufs.sh/f/mgG8Yp1X9p5vKCxpzFReMY6VDm8WNosJjy91SA7OxLhIH5Qz",
  },
  {
    id: "mgG8Yp1X9p5v0Qj5FyUDxhnoKp8aAPubiYyHfqdCLRXFBstl",
    name: "bouquet-alisa-1.jpg",
    url: "https://njmm8e6312.ufs.sh/f/mgG8Yp1X9p5v0Qj5FyUDxhnoKp8aAPubiYyHfqdCLRXFBstl",
  },
  {
    id: "mgG8Yp1X9p5vUfqy5nwyKEDPzcdYMOiL8j1u2WbqsVwBN075",
    name: "bouquet-alisa-2.jpg",
    url: "https://njmm8e6312.ufs.sh/f/mgG8Yp1X9p5vUfqy5nwyKEDPzcdYMOiL8j1u2WbqsVwBN075",
  },
  {
    id: "mgG8Yp1X9p5vzGAj5C6QqothpDwSr5YB8LNHEvyWmMIun40G",
    name: "bouquet-alisa-1.jpg",
    url: "https://njmm8e6312.ufs.sh/f/mgG8Yp1X9p5vzGAj5C6QqothpDwSr5YB8LNHEvyWmMIun40G",
  },
  {
    id: "mgG8Yp1X9p5vcO2idR42Ceq1RWILG3fczmyvMhgQnO4VHDwx",
    name: "bouquet-alisa-2.jpg",
    url: "https://njmm8e6312.ufs.sh/f/mgG8Yp1X9p5vcO2idR42Ceq1RWILG3fczmyvMhgQnO4VHDwx",
  },
  {
    id: "mgG8Yp1X9p5vmprWoN1X9p5vRSPlj6hdyDFGWikgbTZCIV78",
    name: "white-ohara-2.jpg",
    url: "https://njmm8e6312.ufs.sh/f/mgG8Yp1X9p5vmprWoN1X9p5vRSPlj6hdyDFGWikgbTZCIV78",
  },
  {
    id: "mgG8Yp1X9p5v0Ak42RDxhnoKp8aAPubiYyHfqdCLRXFBstl1",
    name: "white-ohara-1.jpg",
    url: "https://njmm8e6312.ufs.sh/f/mgG8Yp1X9p5v0Ak42RDxhnoKp8aAPubiYyHfqdCLRXFBstl1",
  },
  {
    id: "mgG8Yp1X9p5vOpYK75ymUFP6Avi4t2G1zYr9ujnKM37Hsgd8",
    name: "cream-box-1.jpg",
    url: "https://njmm8e6312.ufs.sh/f/mgG8Yp1X9p5vOpYK75ymUFP6Avi4t2G1zYr9ujnKM37Hsgd8",
  },
  {
    id: "mgG8Yp1X9p5viJzD3QE9eGKHdRmbuNvnMkpWCyO2TgLzrU40",
    name: "sweet-2.jpg",
    url: "https://njmm8e6312.ufs.sh/f/mgG8Yp1X9p5viJzD3QE9eGKHdRmbuNvnMkpWCyO2TgLzrU40",
  },
  {
    id: "mgG8Yp1X9p5vFZmg7ZoBYGM0x51Xkr9t2iosJVAzI8RjdTOb",
    name: "sweet-1.jpg",
    url: "https://njmm8e6312.ufs.sh/f/mgG8Yp1X9p5vFZmg7ZoBYGM0x51Xkr9t2iosJVAzI8RjdTOb",
  },
  {
    id: "mgG8Yp1X9p5v2Pb9PBdXAGgflnWhTOrC3m0sScIpKe6JYE8Q",
    name: "red-rose-box-2.webp",
    url: "https://njmm8e6312.ufs.sh/f/mgG8Yp1X9p5v2Pb9PBdXAGgflnWhTOrC3m0sScIpKe6JYE8Q",
  },
  {
    id: "mgG8Yp1X9p5vPLoNyjutDy2sepuvni7lBTdHCRMwJ1GkNgq3",
    name: "red-rose-box-1.webp",
    url: "https://njmm8e6312.ufs.sh/f/mgG8Yp1X9p5vPLoNyjutDy2sepuvni7lBTdHCRMwJ1GkNgq3",
  },
  {
    id: "mgG8Yp1X9p5vWZiEERKbV9OXzpZhUGHxRN8kK2dsED6nAv0j",
    name: "lady-rose-1.webp",
    url: "https://njmm8e6312.ufs.sh/f/mgG8Yp1X9p5vWZiEERKbV9OXzpZhUGHxRN8kK2dsED6nAv0j",
  },
  {
    id: "mgG8Yp1X9p5vmgt6ph1X9p5vRSPlj6hdyDFGWikgbTZCIV78",
    name: "lady-rose-2.webp",
    url: "https://njmm8e6312.ufs.sh/f/mgG8Yp1X9p5vmgt6ph1X9p5vRSPlj6hdyDFGWikgbTZCIV78",
  },
  {
    id: "mgG8Yp1X9p5v7cTyzLs9SIL2eXMUvbiKtwpYPNEkuxRWcFy0",
    name: "franch-rose-2.webp",
    url: "https://njmm8e6312.ufs.sh/f/mgG8Yp1X9p5v7cTyzLs9SIL2eXMUvbiKtwpYPNEkuxRWcFy0",
  },
  {
    id: "mgG8Yp1X9p5v2aGJ6WdXAGgflnWhTOrC3m0sScIpKe6JYE8Q",
    name: "franch-rose-1.webp",
    url: "https://njmm8e6312.ufs.sh/f/mgG8Yp1X9p5v2aGJ6WdXAGgflnWhTOrC3m0sScIpKe6JYE8Q",
  },
];

async function main() {
  await seedImages();
}

async function seedImages() {
  const images = imagesData.map((file) => {
    return {
      id: file.id,
      name: file.name,
      url: `https://njmm8e6312.ufs.sh/f/${file.id}`,
    };
  });

  await prisma.images.createMany({
    data: images,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
