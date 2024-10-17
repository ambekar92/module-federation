import axios from 'axios';

export async function deleteSubsidiary(url: string, id:any) {
  await axios.delete(url+"?parent_entity_id="+ id);
}
