'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { createItem, updateItem, deleteItem, getItems } from '@/app/api/items/route';
import Link from 'next/link';
import Image from 'next/image';

export default function EditPage() {
  const queryClient = useQueryClient();

  const { data: items = [], refetch, error } = useQuery({
    queryKey: ['post'],
    queryFn: getItems,
  });

  const addMutation = useMutation({
    mutationFn: createItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['post'] }),
  });

  const updateMutation = useMutation({
    /**
     * Mutation function to update an item.
     * @param {Object} variables - The variables required for updating an item.
     * @param {string} variables.id - The ID of the item to update.
     * @param {HTMLFormElement} variables.data - The form data containing the updated fields.
     * @returns {Promise<any>} The result of the update operation.
     * @throws Will throw an error if id or data is not provided.
     */
    mutationFn: async (variables: { id: string; data: FormData }): Promise<any> => {
      if (!variables || !variables.id) {
        throw new Error('No id provided');
      }
      const data = variables.data;
      if (!data) {
        throw new Error('No data provided');
      }
      return updateItem(variables.id, data);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['post'] }),
   
  });


  const deleteMutation = useMutation({
    /**
     * Deletes an item with the given id.
     * @param {{ id: string }} variables The id of the item to delete.
     * @returns {Promise<void>} A promise that resolves when the item has been deleted.
     */
    mutationFn: async ({ id }: { id: string }): Promise<void> => {
      if (!id) {
        throw new Error('No id provided');
      }
      try {
        await deleteItem(id);
      } catch (error) {
        console.error('Error deleting item:', error);
        throw new Error('Failed to delete item');
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['post'] }),
   
  });
  const handleDeleteItem = (id: string) => {
    deleteMutation.mutate({ id });
  };

  const [editingItem, setEditingItem] = useState<any>(null);
  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem);
    }
  }, [editingItem]);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    language: '',
    category: '',
    demographic: '',
    topic: '',
    context: '',
    comment: '',
    vidurl: '',
    thumbnail: '',
    thumbimg: '',
    nation: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    if (editingItem) {
      await updateMutation.mutateAsync({ id: editingItem.id, data: formData });
      refetch(); 
      alert('Item updated successfully!'); 
    }else{
      try {
        await addMutation.mutateAsync(formData);
        refetch(); 
        alert('Item Inserted successfully!'); 
      } catch (error) {
        console.error(error);
      }
    } 
    setFormData({
      title: items[0].title ?? '',
      subtitle: items[0].subtitle ?? '',
      language: items[0].language ?? '',
      category: items[0].category ?? '',
      demographic: items[0].demographic ?? '',
      topic: items[0].topic ?? '',
      context: items[0].context ?? '',
      comment: items[0].comment ?? '',
      vidurl: items[0].vidurl ?? '',
      thumbnail: items[0].thumbnail ?? '',
      thumbimg: items[0].thumbimg ?? '',
      nation: items[0].nation ?? '',
    });
    setEditingItem(null);
  };

  return (
    <div className="pagescreen">
      <div className="backbtn">
          <Link href="/pages/HomePage">
              <div className="backbtn">
                  <p>Back</p>
              </div>
          </Link>
      </div>
      <div className='row1fr1fr' style={{height:"100dvh"}}>
        {/* left panel start */}
        <div className='flexpanel'>
          <h1>Medicine Bundle Manager</h1>
          <form onSubmit={handleSubmit} style={{width:"50%"}}>
            <div className='itempanel row1fr1fr'>
              <label htmlFor="title"><h4 style={{lineHeight:"5px"}}>Title :</h4></label>
              <input
                type="text"
                name="title"
                placeholder='Title'
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />  
            </div>
            <div className='itempanel row1fr1fr'>
              <label htmlFor="subtitle"><h4 style={{lineHeight:"5px"}}>Sun-Title :</h4></label>
              <input
                type="text"
                name="subtitle"
                placeholder='Subtitle'
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              />  
            </div>
            <div className='itempanel row1fr1fr'>
              <label htmlFor="language"><h4 style={{lineHeight:"5px"}}>Language :</h4></label>
              <select
                name="language"
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
              >
                <option value="english">English</option>
                <option value="ininew">Ininew</option>
                <option value="dene">Dene</option>
              </select>
            </div>  
            <div className='itempanel row1fr1fr'>
              <label htmlFor="Category"><h4 style={{lineHeight:"5px"}}>Category :</h4></label>
              <select
                name="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="sacred">Sacred</option>
                <option value="natlaws">Natural Laws</option>
                <option value="ceremony">Ceremony</option>
                <option value="land">The land</option>
              </select>
            </div>
            <div className='itempanel row1fr1fr'>
              <label htmlFor="demographic"><h4 style={{lineHeight:"5px"}}>Demographic :</h4></label>
              <select
                name="demographic"
                value={formData.demographic}
                onChange={(e) => setFormData({ ...formData, demographic: e.target.value })}
              >
                <option value="community">Community</option>
                <option value="family">Family`</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="children">Children</option>
              </select>
            </div>
            <div className='itempanel row1fr1fr'>
              <label htmlFor="topic"><h4 style={{lineHeight:"5px"}}>Topic :</h4></label>
              <select
                name="topic"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              >
                 <option value="sacrednature">Sacred Nature</option>
                <option value="sacredteachings">Sacred Teachings</option>
                <option value="ceremony">Ceremony</option>
                <option value="wellbeing">Well Being</option>
                <option value="naturallaws">Natural Laws</option>
                <option value="socialmanners">Social Etiquette</option>
                <option value="socialroles">Social Roles</option>
                <option value="culture">Culture</option>
              </select>
            </div>
            <div className='itempanel row1fr1fr'>
              <label htmlFor="context"><h4 style={{lineHeight:"5px"}}>Context :</h4></label>
              <select
                name="context"
                value={formData.context}
                onChange={(e) => setFormData({ ...formData, context: e.target.value })}
              >
                <option value="none">Doesn't Apply</option>
                <option value="happiness">Happiness</option>
                <option value="grieving">Grieving</option>
                <option value="anger">Anger</option>
                <option value="courage">Courage</option>
                <option value="selfishness">Selfishness</option>
              </select>
            </div>
            <div className='itempanel row1fr1fr'>
              <label htmlFor="comment"><h4 style={{lineHeight:"5px"}}>Comment :</h4></label>
              <textarea
                name="comment"
                placeholder="comment"
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              />  
            </div>
            <div className='itempanel row1fr1fr'>
              <label htmlFor="vidurl"><h4 style={{lineHeight:"5px"}}>Video :</h4></label>
              <input
                type="text"
                name="vidurl"
                placeholder="Video Location"
                value={formData.vidurl}
                onChange={(e) => setFormData({ ...formData, vidurl: e.target.value })}
              />  
            </div>
            <div className='itempanel row1fr1fr'>
              <label htmlFor="thumbnail"><h4 style={{lineHeight:"5px"}}>Thumbnail :</h4></label>
              <input
                type="text"
                name="thumbnail"
                placeholder="Teacher Profile"
                value={formData.thumbnail}
                onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
              />  
            </div>
            <div className='itempanel row1fr1fr'>
              <label htmlFor="thumbimg"><h4 style={{lineHeight:"5px"}}>Thumbimg :</h4></label>
              <input
                type="text"
                name="thumbimg"
                placeholder="Symbol Image"
                value={formData.thumbimg}
                onChange={(e) => setFormData({ ...formData, thumbimg: e.target.value })}
              />  
            </div>
            <div className='itempanel row1fr1fr'>
              <label htmlFor="nation"><h4 style={{lineHeight:"5px"}}>Nation :</h4></label>
              <select
                name="nation"
                value={formData.nation}
                onChange={(e) => setFormData({ ...formData, nation: e.target.value })}
              >
                <option value="english">English</option>
                <option value="ininew">Ininew</option>
                <option value="dene">Dene</option>
              </select>
            </div>

            <div className='itempanelrrfr flexpanel'>
              <button type="submit">{editingItem ? 'Update' : 'Add'} Item</button>
            </div>

            
          </form>
        </div>
        {/* right panel start */}
        <div className='flexpanel'>
          <div className="scrollpanel">
              {items.map((item: any) => (
                <div className='itempanel' key={item.id}>
                  <div className='row1fr1fr'>
                    <div className='flexpanel'>
                      <Image 
                          src={item.thumbnail} 
                          alt="teacherimg" 
                          width={100} 
                          height={100}
                          style={{justifySelf:"flex-end"}}
                      />
                    </div>
                    <div className='flexpanel'>
                      <Image 
                          src={item.thumbimg} 
                          alt="iconimg" 
                          width={100} 
                          height={100}
                          style={{justifySelf:"flex-end"}}
                      />
                    </div>
                  </div>
                  <div className='row1fr1fr'>
                  <h3>Title:{item.title}</h3>
                  <h3>Sub-Title:{item.subtitle}</h3>
                  <h3>Category:{item.category}</h3>
                  <h3>Topic:{item.topic}</h3>
                  <h3>Context:{item.context}</h3>
                  <h3>Comment:{item.comment}</h3>
                  </div>
                  <div className='flexpanelR' style={{width:"100%", height:"100px"}}>
                  <button onClick={() => setEditingItem(item)}>Edit</button>
                  <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
                  </div>
                </div>
              ))}
          </div>
        </div>

      </div>
    </div>
  );
}
