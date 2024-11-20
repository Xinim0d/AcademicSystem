using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AkademineSistema.Models;

public class Professor : User, IEntityTypeConfiguration<Professor>
{
    public virtual List<Subject> Subjects { get; set; }
    
    public void Configure(EntityTypeBuilder<Professor> builder)
    {
        builder.HasMany(m => m.Subjects)
            .WithMany(m => m.Professors);
    }
}


