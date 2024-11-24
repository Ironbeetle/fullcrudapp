"use server"
import Link from "next/link";
import prisma from '@/lib/prisma';

  const page = async ({params}:any) => {
    const itemid = params.id;
    const post = await prisma.post.findUnique({
        where: {
            id: itemid,
        },
    });

    if (!post) {
        throw new Error("Post not found");
    }

    return (
        <div className="pagescreen">
            <div className="backbtn">
                <Link href="/pages/Viewer">
                    <div className="backbtn">
                        <p>Back</p>
                    </div>
                </Link>
            </div>
            <div className="row1fr2fr">
                <div className="flexpanel">
                    <div className="row1fr1fr" style={{ width: "100%" }}>
                        <div className="apptexth2B">
                            <h2>Title</h2>
                        </div>
                        <div className="apptexth2">
                            <h2>{post.title}</h2>
                        </div>
                    </div>
                    <div className="row1fr1fr" style={{ width: "100%" }}>
                        <div className="apptexth2B">
                            <h2>Teacher</h2>
                        </div>
                        <div className="apptexth2">
                            <h2>{post.subtitle}</h2>
                        </div>
                    </div>
                    <div className="row1fr1fr" style={{ width: "100%" }}>
                        <div className="apptexth2B">
                            <h2>Category</h2>
                        </div>
                        <div className="apptexth2">
                            <h2>{post.category}</h2>
                        </div>
                    </div>
                    <div className="row1fr1fr" style={{ width: "100%" }}>
                        <div className="apptexth2B">
                            <h2>Demographic</h2>
                        </div>
                        <div className="apptexth2">
                            <h2>{post.demographic}</h2>
                        </div>
                    </div>
                    <div className="row1fr1fr" style={{ width: "100%" }}>
                        <div className="apptexth2B">
                            <h2>Topic</h2>
                        </div>
                        <div className="apptexth2">
                            <h2>{post.topic}</h2>
                        </div>
                    </div>
                    <div className="row1fr1fr" style={{ width: "100%" }}>
                        <div className="apptexth2B">
                            <h2>Context</h2>
                        </div>
                        <div className="apptexth2">
                            <h2>{post.context}</h2>
                        </div>
                    </div>
                    <div className="row1fr1fr" style={{ width: "100%" }}>
                        <div className="apptexth2B">
                            <h2>Comment</h2>
                        </div>
                        <div className="apptexth2">
                            <h2>{post.comment}</h2>
                        </div>
                    </div>
                </div>
                <div className='flexpanel' style={{ height: "100dvh" }}>
                    <iframe
                        id="video"
                        src={post.vidurl ?? ''}
                        width="720"
                        height="480"
                        style={{ border: 'none', marginTop: "10%" }}
                    />
                    <div className="flexpanel">
                       
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
