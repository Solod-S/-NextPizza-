export async function pause(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export default async function Team() {
  await pause(3000);

  //throw new Error('Data not available')

  return null;
}
